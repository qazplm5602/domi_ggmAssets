import Input from "@components/Admin/Inputs/Input";

export default function VersionBaseInput({ ...props }: Omit<Parameters<typeof Input>['0'], "placeholder">) {
    return <Input placeholder='버전을 입력하세요.' {...props} />;
}