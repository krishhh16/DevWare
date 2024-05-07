import React from "react"

const PrimaryButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'>>
    (({ className, ...props }, ref) =>
        <button
            ref={ref}
            className='h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center'
            {...props}
        />
    )
PrimaryButton.displayName = 'PrimaryButton'

const OutlineButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'>>
    (({ className, ...props }, ref) =>
        <button
            ref={ref}
            
            {...props}
        />
    )
OutlineButton.displayName = 'OutlineButton'


export { PrimaryButton, OutlineButton }