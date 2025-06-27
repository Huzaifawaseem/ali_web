import { CheckCircle } from 'lucide-react';

const whyChooseUsPoints = [
    "Top-Quality Services: From massages to facials and wellness therapies, every treatment is delivered with excellence.",
    "Customer Satisfaction: Clients consistently leave positive reviews and testimonials.",
    "Variety of Treatments: A wide selection of massage types and beauty services ensures something for everyone.",
    "Experienced Professionals: Trained staff ensure your comfort and care at every step.",
    "Relaxing Atmosphere: Designed to promote peace and serenity.",
    "Hygiene & Cleanliness: Prioritizing safety and cleanliness at every level.",
    "Customization: Personalized treatments based on your individual needs.",
    "Value for Money: Competitive pricing for premium quality services.",
  ];

export function MoreInfo() {
  return (
    <section id="more-info" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center">
              The Crucial Connection: The Importance of Relaxation
            </h2>
            <p className="text-lg text-muted-foreground text-center">At Royal Massage Spa Karachi</p>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">The Stress Epidemic: Unveiling the Need for Relaxation</h3>
              <p>Stress has become an unwelcome companion in our lives, stemming from demanding work schedules, societal expectations, and personal challenges. Unmanaged stress can lead to a cascade of physical, emotional, and mental health issues. This is where relaxation steps in as a potent antidote at Royal Massage Spa Karachi.</p>
              
              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Physical Renewal: Restoring the Body’s Equilibrium</h3>
              <p>The physical toll of stress is far-reaching, affecting various bodily systems. Chronic stress contributes to elevated blood pressure, weakened immune function, and disrupted sleep patterns. Relaxation techniques, such as meditation, deep breathing, and massage therapy at our Karachi massage center, have been proven to lower stress hormones, allowing the body to recover and restore its natural balance.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Cognitive Clarity: Enhancing Mental Resilience</h3>
              <p>A cluttered mind often leads to poor decision-making and reduced cognitive function. Regular relaxation practices like mindfulness and yoga provide the brain with a much-needed break from constant stimulation. This promotes mental clarity, improved focus, and heightened creativity. Individuals who engage in regular relaxation techniques are better equipped to handle complex tasks at Royal Massage Spa Karachi.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Emotional Rejuvenation: Managing Anxiety and Mood</h3>
              <p>The emotional toll of stress often manifests as anxiety, irritability, or depression. Engaging in relaxation practices triggers the release of endorphins—natural mood elevators. At Royal Massage Spa Karachi, this promotes emotional well-being, reducing the risk of mood disorders and helping individuals better cope with daily life.</p>
              
              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">The Role of Relaxation in Preventive Health Care</h3>
              <p>Considering its many benefits, relaxation is a proactive form of healthcare. Incorporating techniques like massage or mindfulness into your routine may help prevent chronic conditions such as heart disease, diabetes, and even certain types of cancer—highlighting the value of relaxation for long-term well-being.</p>
              
              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Fostering Connection: Enhancing Relationships</h3>
              <p>The relentless pace of life can strain relationships. Participating in relaxation activities as a couple or family at Royal Massage Spa Karachi creates a space for connection, enhancing emotional intimacy and communication.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Creating a Holistic Lifestyle: The Path to Wholeness</h3>
              <p>True well-being goes beyond physical health—it includes mental, emotional, and spiritual harmony. Relaxation acts as a bridge to this holistic lifestyle, helping individuals nurture inner peace and purpose.</p>

              <div className="pt-4">
                  <h4 className="font-headline text-xl font-bold text-foreground">Conclusion: Embrace Relaxation for a Brighter Tomorrow</h4>
                  <p>In a world where busyness is mistaken for productivity, remember this: true vitality comes from rest and renewal. Relaxation isn’t a luxury—it’s a necessity. By prioritizing it, you’ll build resilience and move toward a healthier, more balanced life. Take a deep breath, unwind, and start your journey at Royal Massage Spa Karachi.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 pt-12 border-t border-border">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center">Why Choose Royal Massage Spa Karachi?</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed text-center">If you’re searching for the best massage center in Karachi, Royal Massage Spa Karachi stands out for multiple reasons:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
                {whyChooseUsPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                    </li>
                ))}
            </ul>
          </div>

          <div className="space-y-6 pt-12 border-t border-border">
             <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center">
              Meditation & Mindfulness: The Harmony Within
            </h2>
             <p className="text-lg text-muted-foreground text-center">At Royal Massage Spa Karachi</p>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>In a world full of noise and pressure, meditation and mindfulness serve as keys to unlocking deep relaxation. At Royal Massage Spa Karachi, we believe these practices are essential tools for achieving inner balance.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">The Essence of Meditation: A Journey Within</h3>
              <p>Meditation is not just a practice—it is a journey into stillness. At our massage center in Karachi, we guide you in techniques that quiet the external world and allow you to turn inward. By focusing on breath and awareness, you gain a sense of calm that combats daily stress.</p>

              <h4 className="font-headline text-xl font-bold text-foreground mt-4">Quieting the Mental Chatter</h4>
              <p>One of meditation’s most powerful effects is silencing the overwhelming mental noise. As you practice, your thoughts become more spacious and less overwhelming, which leads to mental clarity and emotional stillness.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Mindfulness: Presence in the Present</h3>
              <p>Mindfulness encourages you to focus on the here and now, helping you let go of past regrets and future worries. Through mindful attention to your breath and sensations, you gain control over your thoughts and emotions.</p>

               <h4 className="font-headline text-xl font-bold text-foreground mt-4">Emotional Balance & Detachment from Stress</h4>
              <p>Both mindfulness and meditation allow you to detach from emotional turbulence. With consistent practice at Royal Massage Spa Karachi, you’ll notice improved emotional resilience and a heightened sense of inner calm.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">The Science Behind It: Neurological Benefits</h3>
              <p>Scientific research shows that meditation increases serotonin and dopamine, neurotransmitters responsible for happiness. It also activates the parasympathetic nervous system, reducing cortisol (stress hormone) and inducing physical relaxation.</p>
              
               <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Physical Relaxation Through Stillness</h3>
              <p>Meditation reduces heart rate, muscle tension, and blood pressure. The physical posture and deep breathing techniques used during sessions at our Karachi massage center promote a relaxed state throughout the body.</p>

              <h3 className="font-headline text-2xl font-bold text-foreground mt-8">Self-Discovery and Inner Peace</h3>
              <p>Meditation is a path to self-awareness. It allows individuals to understand their reactions, beliefs, and habits, releasing emotional baggage and finding peace—both essential for true relaxation.</p>
              
              <div className="pt-4">
                  <h4 className="font-headline text-xl font-bold text-foreground">Conclusion: Embrace the Calm Within</h4>
                  <p>In the chaos of modern life, meditation and mindfulness are your anchors. These practices can be life-changing, offering peace, clarity, and relaxation. At Royal Massage Spa Karachi, we invite you to experience this tranquility first-hand. Sit back, close your eyes, and begin the journey to your calmest self.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
