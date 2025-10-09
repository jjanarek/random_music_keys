import random

KEYS = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]


def generatae_keys(bars: int) -> list[str]:
    if bars < 1 or bars > 24:
        raise ValueError("Number of bars has to be between 1 and 24")
    return [random.choice(KEYS) for _ in range(bars)]
