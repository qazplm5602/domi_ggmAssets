type Props = {
    autoValue?: [ any, React.Dispatch<React.SetStateAction<any>> ]
}

export default function Textarea({ className, autoValue, value, onChange, ...props }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
    const realVal = autoValue ? autoValue[0] : value;
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = function(e) {
        if (onChange)
            onChange(e);

        if (autoValue)
            autoValue[1](e.target.value);
    }

    return <textarea className={className || ''} type="text" value={realVal} onChange={handleChange} {...props} />
}