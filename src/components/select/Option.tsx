import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	/** Объект с данными об опции */
	option: OptionType;
	/** Функция-обработчик выбора опции */
	onClick: (value: OptionType['value']) => void;
};

export const Option = ({ option, onClick }: OptionProps) => {
	const { value, title, optionClassName, className } = option;

	/** Реф для управления фокусом */
	const optionRef = useRef<HTMLLIElement>(null);

	/** Обработчик клика по опции */
	const handleClick: MouseEventHandler<HTMLLIElement> = () => {
		onClick(value);
	};

	/** Хук для обработки нажатия Enter на опции */
	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(
				styles.option,
				optionClassName && styles[optionClassName]
			)}
			value={value}
			onClick={handleClick}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
