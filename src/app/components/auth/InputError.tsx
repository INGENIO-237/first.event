export default function InputError({message}: { message: string|undefined }) {
    return (
        <div className="mt-1 text-red-500">
        <span className="text-xs">{message}</span>
        </div>
    );
}