'use client';

type Props = {
  error: Error;
};

const error = ({ error }: Props) => {
    return (
        <p>Could not fetch note details. {error.message}</p>

    )
}
export default error