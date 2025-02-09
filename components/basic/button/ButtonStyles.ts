import { tv } from 'tailwind-variants'

export const baseButton = tv({
  base: 'text-center relative font-semibold whitespace-nowrap align-middle outline-none inline-flex items-center justify-center select-none',
  variants: {
    size: {
      // xs: 'text-sm py-1 px-2',
      xs: 'text-[0.85em] py-1 px-2',
      md: 'text-sm py-2 px-4',
      lg: 'text-base py-3 px-6',
      xl: 'text-lg py-4 px-8',
      xxl: 'text-xl py-5 px-10',
      square_xs: 'text-xs h-4 w-4 p-1',
      square_sm: 'text-sm h-6 w-6 p-1',
      square_md: 'text-base h-8 w-8 p-1',
      square_lg: 'text-lg h-10 w-10 p-1',
      square_xl: 'text-xl h-12 w-12 p-1',
    },
    vPadding: {
      xs: 'py-[4px]',
      sm: 'py-[8px]',
      md: 'py-[12px]',
      lg: 'py-[16px]',
    },
    vSpace: {
      xs: 'my-1',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
    HSpace: {
      xs: 'mx-1',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
    },
    align: {
      center: 'mx-auto',
      right: 'ml-auto',
      left: 'mr-auto',
      top: 'mb-auto',
      bottom: 'mt-auto',
    },
    rounded: {
      none: 'rounded-none',
      xs: 'rounded-[2px]',
      sm: 'rounded-[4px]',
      normal: 'rounded-[8px]',
      lg: 'rounded-[12px]',
      full: 'rounded-full',
    },
    behavior: {
      block: 'w-full',
    },
  },
})


// create solid button styles
export const solidButton = tv({
  extend: baseButton,
  variants: {
    color: {
      green:
        'bg-[#58cc02] text-gray-100 shadow active:shadow-none active:translate-y-[5px] hover:bg-gray-100 hover:text-[#58cc02]',
      teal:
        'bg-[#0D9488] text-gray-100 shadow-teal active:shadow-none active:translate-y-[5px] hover:bg-gray-100 hover:text-[#0D9488]',
      yellow:
        'bg-[#FFC700] text-gray-100 shadow-yellow active:shadow-none active:translate-y-[5px] hover:bg-gray-100 hover:text-[#FFC700]',
      gray:
        'bg-[#64748B] text-gray-100 shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-gray-100 hover:text-[#64748B]',
      orange:
        'bg-[#ff5722] text-gray-100 shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-gray-100 hover:text-[#e24b0ad9]',
      glassBlue:
        'bg-[#4b8dc9] text-gray-100 shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-gray-100 hover:text-[#4b8dc9]',
      black:
        'bg-[#000000] text-white shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-white hover:text-[#000000]',
      pink:
        'bg-[#DE3163] text-white shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-white hover:text-[#DE3163]',
      red:
        'bg-[#992B2B] text-white shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-white hover:text-[#992B2B]',
    },
    disabled: {
      true: 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-50 shadow-none translate-y-0 hover:bg-gray-400 hover:text-gray-200',
      false: '',
    },
  },
})


//create outline button styles
export const outlineButton = tv({
  extend: baseButton,
  base: 'ring-1',
  variants: {
    color: {
      green:
        'ring-[#58cc02] text-[#58cc02] shadow active:shadow-none active:translate-y-[5px] hover:bg-[#58cc02] hover:text-gray-100',
      teal:
        'ring-[#0D9488] text-[#0D9488] shadow-teal active:shadow-none active:translate-y-[5px] hover:bg-[#0D9488] hover:text-gray-100',
      yellow:
        'ring-[#FFC700] text-[#FFC700] shadow-yellow active:shadow-none active:translate-y-[5px] hover:bg-[#FFC700] hover:text-gray-100',
      gray:
        'ring-[#64748B] text-[#64748B] shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-[#64748B] hover:text-gray-100',
      pink: 'ring-[#DE3163] text-[#64748B] shadow-blueGray active:shadow-none active:translate-y-[5px] hover:bg-[#DE3163] hover:text-gray-100',
    },
    disabled: {
      true: 'ring-gray-400 text-gray-300 cursor-not-allowed opacity-50 shadow-none translate-y-0 hover:bg-transparent hover:text-gray-300',
      false: '',
    },
  },
})

//create ghost button styles
export const ghostButton = tv({
  extend: baseButton,
  variants: {
    color: {
      green: 'text-[#58cc02] hover:bg-[#58cc02] hover:text-gray-100',
      teal: 'text-[#0D9488] hover:bg-[#0D9488] hover:text-gray-100',
      yellow: 'text-[#FFC700] hover:bg-[#FFC700] hover:text-gray-100',
      gray: 'text-[#64748B] hover:bg-[#64748B] hover:text-gray-100',
      pink: 'text-[#DE3163] hover:bg-[#DE3163] hover:text-white-100',
    },
    disabled: {
      true: 'text-gray-400 cursor-not-allowed opacity-50 hover:bg-transparent',
      false: '',
    },
  },
})
