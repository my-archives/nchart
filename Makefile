test:
	@./node_modules/.bin/mocha \
		--require should \
		--bail

clean:
	rm -rf examples/*.png

.PHONY: test clean
