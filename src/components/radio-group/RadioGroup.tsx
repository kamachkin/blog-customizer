import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Option } from './Option';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (value: OptionType) => void;
	title: string;
};

export const RadioGroup = ({
	name,
	options,
	selected,
	onChange,
	title,
}: RadioGroupProps) => {
	const handleChange = (option: OptionType) => onChange?.(option);

	return (
		<div
			className={styles.container}
			role='radiogroup'
			aria-labelledby={`${name}-title`}>
			{/* Оборачиваем заголовок в div, чтобы сохранить `id` */}
			{title && (
				<div id={`${name}-title`}>
					<Text weight={800} size={12} uppercase>
						{title}
					</Text>
				</div>
			)}

			<div className={styles.group}>
				{options.map((option) => (
					<Option
						key={option.value}
						groupName={name}
						value={option.value}
						title={option.title}
						selected={selected}
						onChange={handleChange}
						option={option}
					/>
				))}
			</div>
		</div>
	);
};
