import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value']; // Значение опции
	title: OptionType['title']; // Текст внутри опции
	selected: OptionType; // Текущая выбранная опция
	groupName: string; // Имя группы радиокнопок
	onChange?: (option: OptionType) => void; // Колбэк при выборе опции
	option: OptionType; // Объект опции
};

export const Option = ({
	value,
	title,
	selected,
	groupName,
	onChange,
	option,
}: OptionProps) => {
	const optionRef = useRef<HTMLDivElement>(null);

	const handleSelectOption = () => onChange?.(option); // Вызываем колбэк, если передан

	useEnterSubmit({ onChange, option }); // Позволяет отправлять форму по Enter

	const inputId = `${groupName}_option_${value}`; // Уникальный идентификатор
	const isChecked = value === selected.value; // Проверяем по значению, а не по заголовку

	return (
		<div
			className={styles.item}
			key={value}
			data-checked={isChecked} // Атрибут для стилизации
			data-testid={inputId}
			aria-checked={isChecked} // Улучшаем доступность
			tabIndex={isChecked ? 0 : -1} // Только выбранная опция доступна по Tab
			ref={optionRef}
			onClick={handleSelectOption} // Делаем всю область кликабельной
		>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				onChange={handleSelectOption}
				tabIndex={-1} // Исключаем input из фокусировки
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
