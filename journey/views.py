import unicodedata
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.views.decorators.http import require_POST
from .models import Passport, Stamp
from .forms import PassportForm
from .data import REGIONS, BY_SLUG

AVATARS = {'palm': '🌴', 'sun': '☀️', 'mountain': '⛰️'}


def current(request):
    pk = request.session.get('passport_id')
    return Passport.objects.filter(pk=pk).first() if pk else None


def context(passport):
    earned = set(passport.stamps.values_list('region', flat=True)) if passport else set()
    return {
        'passport': passport,
        'regions': [dict(r, earned=r['slug'] in earned) for r in REGIONS],
        'count': len(earned),
        'percent': len(earned) * 20,
        'avatar': AVATARS.get(passport.avatar, '🌴') if passport else '🌴',
    }


def home(request):
    passport = current(request)
    form = PassportForm(request.POST or None, initial={'avatar': 'palm'})
    if request.method == 'POST' and form.is_valid():
        if passport:
            return redirect('destinations')
        passport = Passport.objects.create(**form.cleaned_data)
        request.session.cycle_key()
        request.session['passport_id'] = str(passport.pk)
        return redirect('destinations')
    return render(request, 'home.html', dict(context(passport), form=form))


def destinations(request):
    passport = current(request)
    if not passport:
        return redirect('home')
    return render(request, 'destinations.html', context(passport))


def normalize(value):
    return ''.join(
        c
        for c in unicodedata.normalize('NFKC', value.strip())
        if not unicodedata.combining(c) and c not in 'ـ '
    )


def challenge(request, slug):
    passport = current(request)
    if not passport:
        return redirect('home')
    from django.http import Http404
    if slug not in BY_SLUG:
        raise Http404
    region = BY_SLUG[slug]
    done = passport.stamps.filter(region=slug).exists()
    error = None
    if request.method == 'POST' and not done:
        if region['kind'] in ['match', 'order']:
            correct = [request.POST.get('part' + str(i), '') for i in range(3)] == region['answer']
        else:
            correct = normalize(request.POST.get('answer', '')) == normalize(region['answer'])
        if correct:
            Stamp.objects.get_or_create(passport=passport, region=slug)
            messages.success(request, 'ختم جديد في جوازك! تستاهل ✨')
            return redirect('challenge', slug=slug)
        error = 'قريب! جرّب مرة ثانية، أو افتح التلميح.'
    return render(
        request,
        'challenge.html',
        dict(context(passport), region=region, done=done, error=error),
    )


def passport_page(request):
    passport = current(request)
    if not passport:
        return redirect('home')
    return render(request, 'passport.html', context(passport))


@require_POST
def reset(request):
    passport = current(request)
    if passport:
        passport.delete()
    request.session.pop('passport_id', None)
    return redirect('home')