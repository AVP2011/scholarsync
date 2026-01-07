from abc import ABC, abstractmethod

class BaseScraper(ABC):
    source_name: str

    @abstractmethod
    def fetch(self) -> list[dict]:
        """Return list of opportunities"""
        pass
