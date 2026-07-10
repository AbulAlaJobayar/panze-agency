"use client";

export default function PricingQuote({ testimonial }: any) {
  return (
    <div className="border-t p-8">
      <p className="italic">"{testimonial.quote}"</p>

      <div className="mt-6 flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>

          <p className="text-sm text-neutral-500">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  );
}
