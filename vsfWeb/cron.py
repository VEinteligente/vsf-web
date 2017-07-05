import json
import requests
import settings
import httplib

import shutil

import StringIO
from PIL import Image

from django_cron import CronJobBase, Schedule

from selenium import webdriver


class ScreenshotCronjob(CronJobBase):
   # Time that the Cronjob will execute
   RUN_EVERY_MIN = 1  # This with the crontab will execute once a week

   schedule = Schedule(run_every_mins=RUN_EVERY_MIN)
   code = ''

   def do(self):
       # Header has the Token of authorization to grab info from the server
       headers = {'Authorization': settings.SERVICES_TOKEN}
       # Snippet has the return of the call to the server
       snippet = requests.get(
           settings.URL_VSF + '/cases/api/list', headers=headers
       )
       # in data we have the .Json file with the info we need
       data = json.loads(snippet.text)
       # Count has the number of cases
       count = data["count"]
       for x in xrange(0, count):
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
               
               try:
                   request = requests.head(domain['url'], timeout=100)
                   ret = request.status_code
               except requests.exceptions.Timeout:
                   # Maybe set up for a retry, or continue in a retry loop
                   ret = 404
               except requests.exceptions.TooManyRedirects:
                   # Tell the user their URL was bad and try a different one
                   ret = 404
               except requests.exceptions.RequestException as e:
                   # catastrophic error. bail.
                   ret = 404
               
               
               
               if ret != 404:                                              
                   driver.get(domain['url'])
                   # screen shot in the static/screenshots folder of the project
                     
                   
                   driver.save_screenshot(
                       "commons/static/screenshots/screen_case_" + 
                       str(id_case) + "_" + str(countDomain) + 
                       ".png"
                       )
      
                   screen = driver.get_screenshot_as_png()
                   
                  # Crop image
                   box = (0, 0, 1024, 550)
                   im = Image.open(StringIO.StringIO(screen))
          
                   region = im.crop(box)
                  
                   region.save("commons/static/screenshots/crop_screen_case_" + 
                       str(id_case) + "_" + str(countDomain) + 
                       ".png", 'PNG', optimize=True, quality=95)
               
               
               
               countDomain = countDomain + 1