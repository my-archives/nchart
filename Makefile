EXAMPLES=examples

test:
	@./node_modules/.bin/mocha \
		--require should \
		--bail

clean:
	rm -rf ${EXAMPLES}/*.png

.PHONY: test clean
