"""
Core abstractions for the Artha data pipeline.

Provides database-agnostic interfaces, typed models, HTTP session management,
and source registry. All pipeline code depends on these abstractions, never on
concrete database implementations directly.
"""
