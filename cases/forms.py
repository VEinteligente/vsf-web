from django import forms
from django.forms import widgets


class SearchCaseForm(forms.Form):

    start_date = forms.DateField(widget=forms.TextInput(attrs={'class': 'date-picker'}), required=False)
    end_date = forms.DateField(widget=forms.TextInput(attrs={'class': 'date-picker'}), required=False)
    isp = forms.MultipleChoiceField(
        choices=(),
        widget=widgets.SelectMultiple(attrs={'class': 'select2'}),
        required=False
    )
    category = forms.MultipleChoiceField(
        choices=(),
        widget=widgets.SelectMultiple(attrs={'class': 'select2'}),
        required=False
    )
    region = forms.MultipleChoiceField(
        choices=(),
        widget=widgets.SelectMultiple(attrs={'class': 'select2'}),
        required=False
    )
    sites = forms.MultipleChoiceField(
        choices=(),
        widget=widgets.SelectMultiple(attrs={'class': 'select2'}),
        required=False
    )

    def __init__(self, selects_data, *args, **kwargs):
        super(SearchCaseForm, self).__init__(*args, **kwargs)

        self.fields['isp'].choices = selects_data['isp']
        self.fields['region'].choices = selects_data['regions']
        self.fields['category'].choices = selects_data['category']
        self.fields['sites'].choices = selects_data['site']
