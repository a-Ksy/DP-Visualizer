import numpy as np
import dp.histogram_utils as histogram_utils
# ToDo: Find a better way to handle budget
BUDGET = 1

def _add_laplace_noise(real_answer: list, sensitivity: float, epsilon: float):
    scale = sensitivity / epsilon
    return [int(answer + np.random.laplace(scale=scale)) for answer in real_answer]


def _noisify_count(count_dict):
    noisy_result = _add_laplace_noise(count_dict.values(), 1, BUDGET)
    return noisy_result


def get_noisy_result(attr_name, count_dict, step=100):
    result = {}
    
    noisy_result = _noisify_count(count_dict)
    data = []
    data.append([attr_name, "Count"])
    for i, k in enumerate(count_dict.keys()):
        data.append([k if k != "" else "not specified", noisy_result[i]])

    histogram_options = histogram_utils.generate_histogram_options(count_dict, step)

    result["data"] = data
    result["options"] = histogram_options
    return result