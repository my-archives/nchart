MOCHA_OPTS= --check-leaks
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-cov:
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html

clean:
	rm -rf coverage.html

.PHONY: test test-cov clean
