import Image from 'next/image'

interface Props {
    blobUrl: string | null;
}

export default function ImageBlob({ blobUrl }: Props) {
    if (!blobUrl) {
        return null;
    }

    return (
        <Image src={blobUrl} alt="Generated quote card" width={150} height={100} />
    )
}