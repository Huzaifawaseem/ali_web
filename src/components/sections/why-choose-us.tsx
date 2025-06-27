'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle } from 'lucide-react';

const facialTreatments = [
    {
      name: "Basic Facial",
      description: "A standard facial involves cleansing, exfoliation, extractions (if needed), a mask, and moisturization. It’s ideal for maintaining healthy skin and addressing minor issues.",
    },
    {
      name: "Chemical Peels",
      description: "These involve applying a solution to the skin to exfoliate and improve skin texture. They help with acne scars, uneven skin tone, and fine lines.",
    },
    {
      name: "Microdermabrasion",
      description: "This treatment uses a device to exfoliate the outer layer of skin, improving texture, minimizing pores, and reducing mild discoloration.",
    },
    {
      name: "Laser or IPL Treatments",
      description: "These use light energy to target concerns such as pigmentation, fine lines, and acne scars. Multiple sessions may be required.",
    },
    {
      name: "HydraFacial",
      description: "A multi-step treatment that includes cleansing, exfoliation, extraction, hydration, and antioxidant protection tailored to your skin’s needs.",
    },
    {
      name: "Radiofrequency (RF) Treatments",
      description: "These stimulate collagen production, leading to tighter and more youthful-looking skin.",
    },
    {
      name: "Oxygen Facial",
      description: "Infuses oxygen and serums into the skin to enhance radiance, circulation, and cell turnover.",
    },
    {
      name: "Microneedling",
      description: "Tiny needles create controlled micro-injuries to stimulate collagen production and improve scars, wrinkles, and fine lines.",
    },
    {
      name: "LED Light Therapy",
      description: "Different LED lights target concerns like acne and inflammation, helping to improve skin health.",
    },
    {
      name: "Cryotherapy Facial",
      description: "Involves extremely cold temperatures to improve circulation and promote collagen production. Our latest tools help you achieve your skincare goals.",
    },
];

const whyNeedFacialPoints = [
    "Oily or acne-prone skin may require more frequent facials, while sensitive or dry skin may need less frequent treatments to avoid overstimulation.",
    "Acne, hyperpigmentation, or aging signs may require consistent treatment initially, followed by regular maintenance.",
    "Deep peels or intense exfoliation require longer intervals between sessions.",
    "Frequent facials can add up in cost and time, so balance is key.",
    "Consult our professionals at Royal Massage Spa Karachi for a personalized skincare plan."
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Massage Section */}
          <div className="space-y-6 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              Why You Need Massage at Royal Massage Spa Karachi
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
                The benefits of massage therapy extend far beyond mere relaxation, reaching into the realms of physical, mental, and emotional well-being. At Royal Massage Spa Karachi, you will get special treatments in a fast-paced world where stress, tension, and the demands of daily life often take a toll on our bodies and minds. In our Karachi massage center, massage therapy emerges as a therapeutic oasis, offering a multitude of advantages that promote overall health and vitality. So visit now at our massage center in Karachi.
            </p>
          </div>

          <div className="space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl font-bold">Physiological Benefits</h3>
              <p className="text-muted-foreground leading-relaxed">
                  In our Karachi massage center, the human body responds to the skilled touch of a massage therapist in profound ways. Muscles that are tense and fatigued from prolonged periods of inactivity or stress begin to release their grip as the gentle manipulation of tissue encourages improved blood circulation. Our expert team at Royal Massage Spa Karachi increases circulation, bringing fresh oxygen and nutrients to cells, aiding in the elimination of metabolic waste products and toxins. This enhanced blood flow can also contribute to reduced muscle soreness and stiffness, enhancing flexibility and range of motion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                  Beyond the physical aspect, massage has a profound impact on the mind and emotions. The soothing environment of a massage room at Royal Massage Spa Karachi, often dimly lit with calming music playing in the background, sets the stage for relaxation. As the therapist’s hands work their magic, the body’s production of stress hormones like cortisol is decreased. The release of endorphins—the body’s natural painkillers and mood enhancers—is heightened. This dual effect leads to a sense of tranquility and even euphoria, easing emotional burdens that may accumulate during daily life.
              </p>
          </div>

           <div className="space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl font-bold">Managing Stress, Anxiety, and Depression</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stress, anxiety, and depression are common ailments in our modern society, affecting millions worldwide. Massage therapy at Royal Massage Spa Karachi provides a non-pharmacological approach to managing these conditions. The gentle kneading, rolling, and tapping motions of various massage techniques coax the body into a state of deep relaxation. It activates the parasympathetic nervous system—the “rest and digest” mode—counteracting the effects of the sympathetic nervous system and its “fight or flight” response. By promoting relaxation, massage can help alleviate symptoms of anxiety and depression, fostering a sense of calm and emotional well-being.
              </p>
          </div>

           <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
               <div className="space-y-4">
                    <h3 className="font-headline text-2xl md:text-3xl font-bold">Effect on the Immune System</h3>
                    <p className="text-muted-foreground leading-relaxed">
                       In addition to its immediate effects, massage at Royal Massage Spa Karachi can contribute to long-term health by bolstering the immune system. Studies have shown that regular massage therapy can increase the production of immune-boosting cells and enhance the body’s defense mechanisms. The relaxation induced by massage also has a positive impact on sleep quality—an essential component of a healthy immune system. As the body relaxes, sleep patterns often improve, leading to a well-rested state that supports overall immune function.
                    </p>
                </div>
                 <div className="space-y-4">
                    <h3 className="font-headline text-2xl md:text-3xl font-bold">Relief from Physical Conditions</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        The benefits of massage extend to specific physical conditions as well. Those suffering from chronic pain conditions, such as fibromyalgia or lower back pain, can find relief through targeted massage techniques. The manipulation of soft tissue, along with increased blood flow, can ease muscle tension and reduce pain sensitivity. Furthermore, individuals recovering from injuries or surgeries often incorporate massage into their rehabilitation programs to enhance healing and reduce scar tissue formation.
                    </p>
                </div>
           </div>

          {/* Facial Section */}
          <div className="space-y-8 pt-12 border-t border-border">
            <div className="text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                Best Facial Treatment at Royal Massage Spa Karachi
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
                   The “best” facial treatment at Royal Massage Spa Karachi can vary depending on individual preferences, skin type, and specific skincare goals. Different people have different needs and concerns, so what might be considered the best facial treatment for one person might not be the same for another. However, here are some popular and effective facial treatments you might consider:
                </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
                {facialTreatments.map((treatment, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{treatment.name}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {treatment.description}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-2xl md:text-3xl font-bold">
              Why You Need a Facial at Royal Massage Spa Karachi
            </h3>
            <p className="text-muted-foreground leading-relaxed">
                How often you should get a facial depends on your skin type, concerns, and treatment goals. While some benefit from weekly facials, others may need them less frequently. Our dedicated team at Royal Massage Spa Karachi can guide you based on:
            </p>
            <ul className="space-y-4">
                {whyNeedFacialPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
