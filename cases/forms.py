from django import forms


class SearchCaseForm(forms.Form):

    date = forms.DateField()
    isp = forms.MultipleChoiceField()
    category = forms.MultipleChoiceField()
    region = forms.MultipleChoiceField()
    sites = forms.MultipleChoiceField()
