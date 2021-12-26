import dp.db_actions as db
import dp.dp_utils as dp_utils


def get_column_names():
    """
    Returns the columns of the table
    """
    return db.get_column_names()


def get_noisy_count_of_attr(attr_name):
    """
    Returns the noisy count histogram of the given attribute
    """
    count_dict = db.get_count_of_attr(attr_name)
    noisy_result = dp_utils.get_noisy_result(attr_name, count_dict)
    return noisy_result


def get_noisy_count_of_attr_w_condition(attr1_name, attr1_val, attr2_name):
    """
    Returns the noisy count histogram of attr_2 with respect to attr_1
    """
    count_dict = db.get_count_of_attr_w_condition(attr1_name, attr1_val, attr2_name)
    noisy_result = dp_utils.get_noisy_result(count_dict)
    return noisy_result

