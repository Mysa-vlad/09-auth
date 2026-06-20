'use client';

type Props = {
  error: Error;
};

const error = ({ error }: Props) => {
  return (
    <p>Could not fetch the filtered notes. {error.message}</p>
  );
};

export default error;
