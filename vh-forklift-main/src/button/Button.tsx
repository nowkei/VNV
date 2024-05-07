import className from 'classnames';

type IButtonProps = {
  xl?: boolean;
  children: string;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-base': !props.xl,
    'btn-primary': true,
    'lg:px-8 lg:py-3 px-2 py-1 md:px-7 md:py-2.5 text-sx font-light text-white sm:text-2lg md:text-3lg lg:text-5lg rounded-full':
      true,
  });

  return (
    <div className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block text-center;
          }

          .btn-base {
            @apply text-sm font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-primary {
            @apply text-white;
            font-size: 10px;
            font-weight: 400;
            background-color: black;
            border: 1px solid white;
            font-weight: 900;
          }

          .btn-primary:hover {
            background-color: #ffffff;
            color: #6c553e;
            border: 2px solid #6c553e;
          }
        `}
      </style>
    </div>
  );
};

export { Button };
