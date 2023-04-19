<section class="sm:flex justify-center items-center w-full py-8 relative {$$props.class}">
  <div class="px-4">
    <div class="sm:w-[45%] sm:text-right">
      <slot name="left" />
    </div>
    <aside class="sm:absolute sm:left-1/2 sm:top-8 sm:max-w-[50%] max-w-full">
      <slot name="right" />
    </aside>
  </div>
</section>
