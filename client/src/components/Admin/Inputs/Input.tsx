import style from '@styles/inputs/style.module.scss';

// type ValueType = React.InputHTMLAttributes<HTMLInputElement>['value'];

type Props = {
    // autoValue?: [ ValueType, React.Dispatch<React.SetStateAction<ValueType>> ]
    autoValue?: [ any, React.Dispatch<React.SetStateAction<any>> ]
}

export default function Input({ className, autoValue, value, onChange, ...props }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
    const realVal = autoValue ? autoValue[0] : value;
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = function(e) {
        if (onChange)
            onChange(e);

        if (autoValue)
            autoValue[1](e.target.value);
    }

    return <input className={`${style.main} ${className || ''}`} type="text" value={realVal} onChange={handleChange} {...props} />
}