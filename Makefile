.PHONY: format sync clean

format:
	uv run ruff format .
	uv run ruff check --fix --select I .

sync:
	uv sync --group dev

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	rm -rf .pytest_cache