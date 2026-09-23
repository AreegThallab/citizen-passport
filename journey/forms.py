from django import forms
class PassportForm(forms.Form):
    name = forms.CharField(max_length=40, min_length=2, label='اسمك في الجواز', widget=forms.TextInput(attrs={'placeholder':'اكتب اسمك الأول','autocomplete':'given-name'}))
    avatar = forms.ChoiceField(choices=[('palm','🌴 نخلة'),('sun','☀️ شمس'),('mountain','⛰️ جبل')],label='رمز رحلتك',widget=forms.RadioSelect)
