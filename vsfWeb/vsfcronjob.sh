#!/bin/bash
# Script for VSF Web Project allowing to take screenshot for the cases pages

echo "Let's Add The Screenshot Cronjob"
echo "Virtual Env Activation"
source Turpial/vsffrontenv/bin/activate
echo "Virtual Env Activated"
python Turpial/VSF/vsf-web/vsfWeb/manage.py runcrons "vsfWeb.cron.ScreenshotCronjob"
echo "Cronjob Added :)"