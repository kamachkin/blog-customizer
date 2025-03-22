import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import { FontFamiliesClasses } from 'src/constants/articleProps';

import styles from './index.module.scss';

type TextProps = {
	children: ReactNode; // Дочерние элементы
	as?: ElementType; // Тип элемента, по умолчанию div
	dynamic?: boolean; // Динамический стиль
	size?: 12 | 18 | 22 | 25 | 31 | 45; // Размер шрифта
	weight?: 400 | 800; // Вес шрифта
	fontStyle?: 'italic' | 'normal'; // Стиль шрифта
	uppercase?: boolean; // Преобразование в верхний регистр
	align?: 'center' | 'left'; // Выравнивание текста
	family?: FontFamiliesClasses; // Семейство шрифта
	dynamicLite?: boolean; // Легкий динамический стиль
	id?: string; // Идентификатор для компонента
};

export const Text = ({
	children,
	as: Tag = 'div', // По умолчанию рендерим как <div>
	size = 18, // Размер шрифта по умолчанию
	dynamic = false, // Стиль для динамического текста
	weight = 400, // Вес шрифта (обычный)
	fontStyle = 'normal', // Стиль шрифта
	uppercase = false, // Преобразование в верхний регистр
	align = 'left', // Выравнивание текста
	family = 'open-sans', // Семейство шрифта
	dynamicLite = false, // Легкий динамический стиль
	id, // Идентификатор для компонента
}: TextProps) => {
	// Собираем классы с помощью clsx для гибкости
	const className = clsx(
		styles.text, // Базовый стиль
		styles[`size${size}`], // Размер шрифта
		{ [styles.dynamic]: dynamic }, // Динамические стили
		styles[`weight${weight}`], // Вес шрифта
		styles[`${fontStyle}`], // Стиль шрифта
		{ [styles.uppercase]: uppercase }, // Преобразование в верхний регистр
		styles[`${align}`], // Выравнивание текста
		styles[`${family}`], // Семейство шрифта
		{ [styles.dynamicLite]: dynamicLite } // Легкий динамичный стиль
	);

	// Возвращаем компонент с нужным тэгом и id, если он передан
	return (
		<Tag className={className} id={id}>
			{children}
		</Tag>
	);
};
