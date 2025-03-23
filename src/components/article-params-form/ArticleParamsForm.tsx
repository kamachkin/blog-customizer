import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useCallback } from 'react';

import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { IAllOptions } from 'src/index';

export type ChangeSelectFn = (selection: OptionType) => void;

interface PropsArticleParamsForm {
	/** Функция для изменения состояния страницы */
	setPageState: React.Dispatch<React.SetStateAction<IAllOptions>>;
}

export const ArticleParamsForm = ({ setPageState }: PropsArticleParamsForm) => {
	// Локальное состояние для управления открытием/закрытием формы
	const [isOpen, setIsOpen] = useState(false);

	// Состояние для хранения текущих значений формы
	const [formState, setFormState] = useState<IAllOptions>(defaultArticleState);

	// Функция для переключения состояния открытия формы
	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	// Функция для сброса формы на значения по умолчанию
	function setDefaultOptions() {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	}

	// Обработка отправки формы, обновление состояния страницы
	function submitForm(evt: React.SyntheticEvent) {
		evt.preventDefault();
		setPageState(formState);
	}

	// Обработчик клика вне компонента
	const handleClickOutside = useCallback((event: MouseEvent) => {
		const asideElement = document.querySelector(`.${styles.container}`);
		const arrowButton = document.querySelector(
			'button[aria-label="Toggle settings panel"]'
		);
		if (
			asideElement &&
			!asideElement.contains(event.target as Node) &&
			arrowButton &&
			!arrowButton.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	}, []);

	// Обработчик нажатия клавиши ESC
	const handleEscPress = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	}, []);

	// Навешиваем обработчики событий, только если форма открыта
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscPress);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscPress);
		};
	}, [isOpen, handleClickOutside, handleEscPress]);

	return (
		<>
			{/* Кнопка для открытия/закрытия формы */}
			<ArrowButton toggleOpenFn={toggleOpen} openState={isOpen} />

			{/* Основной контейнер формы с динамическим классом */}
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				{/* Форма с параметрами статьи */}
				<form className={styles.form} onSubmit={submitForm}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								fontFamilyOption: selected,
							}))
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								fontSizeOption: selected,
							}))
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								fontColor: selected,
							}))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								backgroundColor: selected,
							}))
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							setFormState((oldState) => ({
								...oldState,
								contentWidth: selected,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={setDefaultOptions} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
