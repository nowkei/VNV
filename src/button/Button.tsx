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
    'px-4 py-2 text-lg font-light text-white rounded-full': true,
    'sm:px-6 sm:py-3 sm:text-xl': true,
    'md:px-8 md:py-4 md:text-2xl': true,
    'lg:px-10 lg:py-5 lg:text-3xl': true,
    'xl:px-12 xl:py-6 xl:text-4xl': props.xl,
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
            font-size: 20px;
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
