.PHONY: test report open-report all-test audit

ifeq ($(OS),Windows_NT)
    DATE := $(shell powershell -Command "Get-Date -Format 'yyyy-MM-dd'" 2>nul)
    TEST_COUNT := $(shell powershell -Command "[guid]::NewGuid().ToString().Substring(0,8)" 2>nul)
    OUTPUT_DIR := test_jest\\$(DATE)_$(TEST_COUNT)
    MKDIR = if not exist "$(OUTPUT_DIR)" mkdir "$(OUTPUT_DIR)"
    CHECK_DIR = if not exist
    MOVE = move
    NODE_CMD = node
else
    DATE := $(shell date +"%Y-%m-%d" 2>/dev/null)
    TEST_COUNT := $(shell uuidgen | cut -c 1-8 2>/dev/null)
    OUTPUT_DIR := test_jest/$(DATE)_$(TEST_COUNT)
    MKDIR = mkdir -p "$(OUTPUT_DIR)"
    CHECK_DIR = test -d
    MOVE = mv
    NODE_CMD = node
endif

all-test: test report open-report

test:
	@echo "Exécution des tests Jest..."
ifeq ($(OS),Windows_NT)
	@if not exist "test_jest" mkdir "test_jest"
	npm test > test_jest\\log_$(TEST_COUNT).log 2>&1 || exit /b 0
else
	@mkdir -p test_jest
	npm test > test_jest/log_$(TEST_COUNT).log 2>&1 || true
endif

report: test
	@echo "Date : $(DATE)"
	@echo "Test Count : $(TEST_COUNT)"
	@echo "Création du dossier de rapport $(OUTPUT_DIR)..."
	@$(MKDIR)
ifeq ($(OS),Windows_NT)
	npx junit-viewer --results="test_jest\\junit.xml" --save="$(OUTPUT_DIR)\\report_$(TEST_COUNT).html" || exit /b 0
	@if exist "test_jest\\junit.xml" $(MOVE) "test_jest\\junit.xml" "$(OUTPUT_DIR)\\junit_$(TEST_COUNT).xml"
	@if exist "test_jest\\log_$(TEST_COUNT).log" $(MOVE) "test_jest\\log_$(TEST_COUNT).log" "$(OUTPUT_DIR)\\log_$(TEST_COUNT).log"
else
	npx junit-viewer --results=test_jest/junit.xml --save=$(OUTPUT_DIR)/report_$(TEST_COUNT).html || true
	@if [ -f test_jest/junit.xml ]; then $(MOVE) test_jest/junit.xml $(OUTPUT_DIR)/junit_$(TEST_COUNT).xml; fi
	@if [ -f test_jest/log_$(TEST_COUNT).log ]; then $(MOVE) test_jest/log_$(TEST_COUNT).log $(OUTPUT_DIR)/log_$(TEST_COUNT).log; fi
endif

open-report:
ifeq ($(OS),Windows_NT)
	@cmd /c start "" "$(OUTPUT_DIR)\\report_$(TEST_COUNT).html"
else
	@if [ "$$(uname)" = "Darwin" ]; then \
		open "$(OUTPUT_DIR)/report_$(TEST_COUNT).html"; \
	elif [ "$$(uname)" = "Linux" ]; then \
		xdg-open "$(OUTPUT_DIR)/report_$(TEST_COUNT).html"; \
	else \
		echo "Veuillez ouvrir $(OUTPUT_DIR)/report_$(TEST_COUNT).html manuellement"; \
	fi
endif

audit:
	@echo "Exécution de l'audit des pages..."
	@$(NODE_CMD) ./audit/audit-pages.js

dev:
	npm run dev
