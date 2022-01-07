import numpy as np


def generate_histogram_options(count_dict, step=100):
    histogram_options = {}
    values = count_dict.values()
    
    histogram_options["x_ticks"] = np.arange(min(values), max(values) + 1, step).tolist()
    
    return histogram_options