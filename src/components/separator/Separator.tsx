import styles from './index.module.scss';

type SeparatorProps = {
	/** Текст, который будет отображаться рядом с разделителем (если передан) */
	text?: string; // Текст разделителя
	color?: string; // Цвет разделителя
	width?: string; // Ширина разделителя
	borderStyle?: 'solid' | 'dashed' | 'dotted';
};

export const Separator = ({
	text,
	color = 'gray', // По умолчанию серый
	width = '100%', // По умолчанию на всю ширину
	borderStyle = 'solid', // По умолчанию сплошная линия
}: SeparatorProps) => {
	// Добавляем стили для цвета и типа линии
	const separatorStyle = {
		borderBottom: `2px ${borderStyle} ${color}`,
		width: width,
	};

	return (
		<div className={styles.separator} style={separatorStyle}>
			{/* Если передан текст, отображаем его */}
			{text && <span className={styles.text}>{text}</span>}
		</div>
	);
};
