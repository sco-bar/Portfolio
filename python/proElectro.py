# проектная работа программы анализа данных потребления электрического ресурса (ЭР), направленная на снижения расхода бюджетных средств на ЭР
import matplotlib.pyplot as plt

# Создание пустого словаря для хранения данных
data = {}

# Список с названиями месяцев
months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

# Цикл для ввода данных по месяцам
for i in range(12):
    # Запрос ввода данных для текущего месяца
    month_name = months[i]
    month_data = int(input("Введите данные для {}: ".format(month_name)))

    # Добавление введенных данных в словарь
    data[month_name] = month_data

# Вычисление среднего значения за год
year_mean = sum(data.values()) / len(data)

# Создание графика
plt.figure(figsize=(10, 5))
plt.bar(data.keys(), data.values(), color='b', label='Потребление электроэнергии')
plt.axhline(y=year_mean, color='r', linestyle='--', label='Среднее значение за год')

# Выделение месяцев, где вводимое число больше 100
for i in range(12):
    if data[months[i]] > 100:
        plt.bar(months[i], data[months[i]], color='r')

# Настройка внешнего вида графика
plt.xticks(rotation='vertical')
plt.title('Мониторинг электропотребления за год')
plt.legend()
plt.show()

input()
