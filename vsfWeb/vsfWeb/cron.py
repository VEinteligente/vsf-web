import json
import requests
import settings

from django_cron import CronJobBase, Schedule

from selenium import webdriver


class ScreenshotCronjob(CronJobBase):
   # Time that the Cronjob will execute
   RUN_EVERY_MIN = 1   # This with the crontab will execute once a week

   schedule = Schedule(run_every_mins=RUN_EVERY_MIN)
   code = ''

   def do(self):
       # Header has the Token of authorization to grab info from the server
       headers = {'Authorization': settings.SERVICES_TOKEN}
       # Snippet has the return of the call to the server
       snippet = requests.get(
           'http://127.0.0.1:8001/cases/api/list', headers=headers
       )
       # in data we have the .Json file with the info we need
       data = json.loads(snippet.text)
       # Count has the number of cases
       count = data["count"]
       for x in xrange(1, count):
           # results has the case (list of dictionaries) with the info we need
           results = data["results"][x]
           id_case = results["id"]
           
           countDomain = 0
           for domain in results["domains"]:
               
               # we call the webdriver to use Phantom JS
               driver = webdriver.PhantomJS()
               # we set the size of the web browser
               driver.set_window_size(1024, 768)
               # we pass the url we need to gran the screenshot from
               driver.get(domain['url'])
               # screen shot in the static/screenshots folder of the project
               driver.save_screenshot(
                   "commons/static/screenshots/screen_case_" +
                   str(id_case) +"_"+str(countDomain)+
                   ".png"
               )
               countDomain = countDomain + 1