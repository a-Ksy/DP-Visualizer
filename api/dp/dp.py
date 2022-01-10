import dp.db_actions as db
import dp.dp_utils as dp_utils


def get_databases():
    """
    Returns the databases that are available
    """
    return db.get_databases()

def get_column_names(db_name):
    """
    Returns the columns of the table
    """
    return db.get_column_names(db_name)


def get_column_values(db_name, attr_name):
    """
    Returns all the values of the column    
    """
    return db.get_attr_values_from_name(db_name, attr_name)


def get_noisy_count_of_attr(db_name, attr_name):
    """
    Returns the noisy count histogram of the given attribute
    """
    count_dict = db.get_count_of_attr(db_name, attr_name)
    if len(count_dict) == 0:
        return {"data": [], "options": {}}
    
    noisy_result = dp_utils.get_noisy_result(attr_name, count_dict)
    
    return noisy_result


def get_noisy_count_of_attr_w_condition(db_name, attr1_name, attr1_val, attr2_name):
    """
    Returns the noisy count histogram of attr_2 with respect to attr_1
    """
    count_dict = db.get_count_of_attr_w_condition(db_name, attr1_name, attr1_val, attr2_name)
    if len(count_dict) == 0:
        return {"data": [], "options": {}}

    noisy_result = dp_utils.get_noisy_result(attr1_name + attr2_name, count_dict, 1)
    
    return noisy_result

