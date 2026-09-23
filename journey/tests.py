from django.test import TestCase, Client
from .models import Passport, Stamp
from .data import REGIONS


class JourneyTests(TestCase):
    def start(self):
        return self.client.post('/', {'name': 'أريج', 'avatar': 'palm'})

    def test_guest_and_invalid_name(self):
        self.assertRedirects(self.client.get('/passport/'), '/')
        self.client.post('/', {'name': 'أ', 'avatar': 'palm'})
        self.assertEqual(Passport.objects.count(), 0)

    def test_full_journey_and_no_duplicate(self):
        self.start()
        for r in REGIONS:
            url = '/station/' + r['slug'] + '/'
            self.assertEqual(self.client.get(url).status_code, 200)
            self.client.post(url, {'answer': 'wrong'})
            self.assertFalse(Stamp.objects.filter(region=r['slug']).exists())
            data = (
                {'part' + str(i): v for i, v in enumerate(r['answer'])}
                if isinstance(r['answer'], list)
                else {'answer': r['answer']}
            )
            self.assertRedirects(self.client.post(url, data), url)
            self.client.post(url, data)
        self.assertEqual(Stamp.objects.count(), 5)
        self.assertContains(self.client.get('/passport/'), 'اكتملت الرحلة')
        self.assertEqual(self.client.get('/destinations/').status_code, 200)

    def test_session_isolation_reset_and_post_only(self):
        self.start()
        self.assertRedirects(Client().get('/passport/'), '/')
        self.assertEqual(self.client.get('/reset/').status_code, 405)
        self.client.post('/reset/')
        self.assertEqual(Passport.objects.count(), 0)

    def test_csrf_and_unknown_region(self):
        self.assertEqual(Client(enforce_csrf_checks=True).post('/', {'name': 'Test'}).status_code, 403)
        self.start()
        self.assertEqual(self.client.get('/station/unknown/').status_code, 404)