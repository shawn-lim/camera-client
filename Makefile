main: build post_build push_integration

minor: build_minor post_build push_integration

major: build_major post_build push_integration

silent: build_silent post_build push_integration

stage: build_silent post_build push_staging

deploy: build_production post_build push_production

chengdu_production: build_silent post_build push_chengdu

build:
	@echo 'Running normal revision build...'
	@grunt build

build_minor:
	@echo 'Running minor revision build...'
	@grunt build_minor

build_major:
	@echo 'Running major revision build...'
	@grunt build_major

build_silent:
	@echo 'Running silent build...'
	@grunt build_silent

build_production:
	@echo 'Running silent build for production...'
	@grunt build_silent:production

push_integration:
	@echo 'Pushing to integration'
	shipit integration deploy

push_staging:
	@echo 'Pushing to staging'
	shipit staging deploy

push_chengdu:
	@echo 'Pushing to Chengdu'
	scp -r dist/* opi@poi-qa.istuary.co:/var/www/banana-peel
	ssh opi@poi-qa.istuary.co -t 'cd /var/www/banana-peel && npm install && sudo /sbin/restart banana-peel';

push_production:
	@echo 'Pushing to production'

post_build:
	@git add . 
	@git commit -am "Deployment Build - `date`"
	@echo 'Build completed.'
	@git push
