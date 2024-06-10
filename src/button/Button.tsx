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
    'font-family: Arial, Helvetica, sans-serif': true,
    'lg:px-48 lg:py-5 px-6 py-2 md:px-14 md:py-4 text-lg font-light text-white sm:text-3xl md:text-4xl lg:text-6xl rounded-full': true,
  });

  return (
    <div className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block text-center;
            font-family: ui-monospace, Helvetica, sans-serif;

          }

          .btn-base {
            @apply text-sm font-semibold py-2 px-4;
            font-family: ui-monospace, Helvetica, sans-serif;

          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
            font-family: ui-monospace, Helvetica, sans-serif;

          }

          .btn-primary {
            @apply text-white;
            font-size: 40px;
            font-weight: 400;
            background-color: black;
            border: 1px solid white;
            font-family: ui-monospace;
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
