from db_actions import *
import numpy as np

BUDGET = 2


def add_laplace_noise(real_answer: list, sensitivity: float, epsilon: float):
    scale = sensitivity / epsilon
    return [answer + np.random.laplace(scale=scale) for answer in real_answer]


def get_noisy_count_of_attr(attr_name):
    count_dict = get_count_of_attr(attr_name)
    noisy_result = add_laplace_noise(count_dict.values(), 1, BUDGET)

    for i, k in enumerate(count_dict.keys()):
        count_dict[k] = noisy_result[i]

    return count_dict
