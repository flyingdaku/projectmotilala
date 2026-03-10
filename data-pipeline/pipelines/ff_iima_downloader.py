"""Compatibility wrapper for the richer IIMA Fama-French pipeline module."""

from pipelines.ff_iima_pipeline import IIMADataDownloader, main, run_iima_ff_pipeline

__all__ = ["IIMADataDownloader", "run_iima_ff_pipeline", "main"]


if __name__ == '__main__':
    main()
