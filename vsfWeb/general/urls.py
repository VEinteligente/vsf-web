from django.conf.urls import url

from views import (Dashboard, AboutUs, BlockedSitesApi, BlockedDomainsApi,
                   BlockedUrlsSites, BlockedDomainsTableCVS,
                   BlockedSitesTableCVS, MapApi, MapVenezuela, MapTableCVS,
                   CaseList, SearchResultCVS, SearchResultFilterCVS,
                   searchTwitterApi, CaseListAdvanced,
                   CaseListApi, ISPListApi, CategoryListApi, RegionListApi,
                   SiteListApi)


urlpatterns = [
    url(r'^dashboard$', Dashboard.as_view(), name="Dashboard"),
    url(r'^about-us$', AboutUs.as_view(), name="AboutUs"),
    url(r'^blocked-sites-api$',
        BlockedSitesApi.as_view(),
        name="BlockedSitesApi"),
    url(r'^blocked-domains-api$',
        BlockedDomainsApi.as_view(),
        name="BlockedDomainsApi"),
    url(r'^blocked-domains_sites$',
        BlockedUrlsSites.as_view(),
        name="BlockedUrlsSites"),
    url(r'^blocked-domains-excel/$',
        BlockedDomainsTableCVS,
        name="ExcelBlockedDomains"),
    url(r'^blocked-sites-excel/$',
        BlockedSitesTableCVS,
        name="ExcelBlockedSites"),
    url(r'^isp-list', ISPListApi.as_view(), name="ISPListApi"),
    url(r'^category-list', CategoryListApi.as_view(), name="CategoryListApi"),
    url(r'^site-list', SiteListApi.as_view(), name="SiteListApi"),
    url(r'^region-list', RegionListApi.as_view(), name="RegionListApi"),
    url(r'^map-Venezuela', MapVenezuela.as_view(), name="MapVenezuela"),
    url(r'^map-api', MapApi.as_view(), name="MapApi"),
    url(r'^map-excel/$', MapTableCVS, name="ExcelMap"),
    url(r'^list-cases/title=(?P<title>(\S|\W)*)&category=' + 
        '(?P<category>(\S|\W)*)&start_date=(?P<s_year>\d*)-(?P<s_month>\d*)-' + 
        '(?P<s_day>\d*)&end_date=(?P<e_year>\d*)-(?P<e_month>\d*)-' + 
        '(?P<e_day>\d*)&region=(?P<region>(\S|\W)*)&site=(?P<site>(\S|\W)*)' + 
        '&isp=(?P<isp>(\S|\W)*)/$',
        CaseList.as_view(),
        name="CaseList"),
    url(r'^advanced-list-cases/title=(?P<title>(\S|\W)*)&category=' + 
        '(?P<category>(\S|\W)*)&start_date=(?P<s_year>\d*)-(?P<s_month>\d*)' + 
        '-(?P<s_day>\d*)&end_date=(?P<e_year>\d*)-(?P<e_month>\d*)-' + 
        '(?P<e_day>\d*)&region=(?P<region>(\S|\W)*)&site=(?P<site>(\S|\W)*)' + 
        '&isp=(?P<isp>(\S|\W)*)/$',
        CaseListAdvanced.as_view(),
        name="CaseListAdvanced"),
    url(r'^advanced-list-cases/$',
        CaseListAdvanced.as_view(),
        name="CaseListEmptyAdvanced"),
    url(r'^list-cases-excel/$',
        SearchResultCVS,
        name="ExcelCaseListEmptyAdvanced"),
    url(r'^list-cases-excel/title=(?P<title>(\S|\W)*)&category=' + 
        '(?P<category>(\S|\W)*)&start_date=(?P<s_year>\d*)-(?P<s_month>\d*)' + 
        '-(?P<s_day>\d*)&end_date=(?P<e_year>\d*)-(?P<e_month>\d*)-' + 
        '(?P<e_day>\d*)&region=(?P<region>(\S|\W)*)/$',
        SearchResultFilterCVS,
        name="ExcelCaseListAdvanced"),
    url(r'^list-cases/$', CaseList.as_view(), name="CaseListEmpty"),
    url(r'^cases-api', CaseListApi.as_view(), name="CaseListApi"),
    url(r'^twitter-api/$',
        searchTwitterApi.as_view(),
        name="SearchTwitterApiEmpty"),
    url(r'^twitter-api/search_twitter=(?P<twitterSearch>(\S|\W)*)$',
        searchTwitterApi.as_view(),
        name="SearchTwitterApi"),
]
