import dp.db_actions as db
import numpy as np

BUDGET = 0.1

# Helper Functions
def _add_laplace_noise(real_answer: list, sensitivity: float, epsilon: float):
    scale = sensitivity / epsilon
    return [answer + np.random.laplace(scale=scale) for answer in real_answer]


def _noisify_result(attr_name, count_dict):
    noisy_result = _add_laplace_noise(count_dict.values(), 1, BUDGET)
    
    result = []
    result.append([attr_name, "Count"])
    for i, k in enumerate(count_dict.keys()):
        result.append([k if k != "" else "not specified", noisy_result[i]])
    
    return result


def get_column_names():
    return db.get_column_names()


# DP Functions
def get_noisy_count_of_attr(attr_name):
    count_dict = db.get_count_of_attr(attr_name)
    noisy_result = _noisify_result(attr_name, count_dict)
    return noisy_result


def get_noisy_count_w_condition(attr1_name, attr1_val, attr2_name):
    count_dict = db.get_count_of_attr_w_condition(attr1_name, attr1_val, attr2_name)
    noisy_result = _noisify_result(count_dict)
    return noisy_result

