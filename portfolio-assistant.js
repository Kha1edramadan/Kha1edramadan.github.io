/* Portfolio answers use the same published project data as the Work section. */
(function () {
  'use strict';
  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value || '').toLowerCase().normalize('NFKC').replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[’']/g,'').replace(/[^a-z0-9\u0600-\u06ff]+/g,' ').trim();
  const projects = () => typeof PROJECTS_DATA === 'undefined' ? [] : PROJECTS_DATA.filter(p => p && p.id && p.title);
  const replies = {
    svc: ['Khaled designs brand identities, packaging, typography and brand guidelines. You can see the published projects in Work.', 'خالد بيصمم هويات بصرية، وتغليف، وخطوط، وأدلة لاستخدام الهوية. تقدر تشوف المشاريع المنشورة في قسم الأعمال.'],
    price: ['There isn’t a fixed price listed on the site. A logo, a full identity and packaging each involve different work, so Khaled quotes for the actual scope. For a price for your project, you can contact him directly on WhatsApp.', 'مفيش سعر ثابت معلن على الموقع. تصميم لوجو غير هوية كاملة غير تصميم تغليف، وكل مشروع بيتسعّر حسب المطلوب. لو عايز تعرف تكلفة مشروعك، تقدر تتواصل مع خالد مباشرة على واتساب.'],
    time: ['The site doesn’t list a standard turnaround. The timeline depends on the work involved and Khaled’s schedule. He can confirm a delivery date before you agree to start.', 'مفيش مدة ثابتة معلنة على الموقع. المدة بتختلف حسب المطلوب ومواعيد خالد، وميعاد التسليم بيتحدد معاك قبل ما تبدأوا.'],
    process: ['The work starts by agreeing on what needs to be designed. Khaled then develops the design, reviews it with you and prepares the agreed files for delivery. The scope, cost and schedule are confirmed before the project starts.', 'في البداية بتتفق مع خالد على المطلوب تصميمه. بعدها بيشتغل على التصميم، ويراجعه معاك، ويجهّز الملفات المتفق عليها للتسليم. المطلوب والتكلفة والمدة بيتحددوا قبل بداية المشروع.'],
    revisions: ['Revisions should be agreed as part of the scope. The site doesn’t specify a fixed number of rounds, so Khaled can confirm what’s included in your quote.', 'التعديلات بتكون ضمن الاتفاق على المشروع. عدد الجولات مش محدد على الموقع، فالأفضل تتأكد مع خالد من التعديلات اللي يشملها عرض السعر.'],
    deliverables: ['The final files depend on the project. A logo and a packaging project need different formats. Khaled can confirm the editable files, export formats and any print-ready files in the quote.', 'الملفات اللي هتستلمها بتختلف حسب نوع المشروع. ملفات اللوجو غير ملفات التغليف. خالد يقدر يوضح لك الملفات المفتوحة والصيغ المطلوبة وملفات الطباعة ضمن عرض السعر.'],
    logo: ['Yes, logo design is part of Khaled’s work. A logo is the main mark; a full visual identity also covers how the brand uses colour, type and other visual elements.', 'أيوه، تصميم اللوجو من شغل خالد. اللوجو هو العلامة الأساسية، أما الهوية البصرية فبتشمل كمان استخدام الألوان والخطوط وباقي العناصر البصرية للبراند.'],
    identity: ['A visual identity brings the logo, colours, typography and supporting design elements together so the brand looks consistent wherever it appears.', 'الهوية البصرية بتجمع اللوجو والألوان والخطوط والعناصر المساعدة في شكل متناسق، عشان البراند يبان بنفس الشخصية في كل استخداماته.'],
    difference: ['The logo is the brand’s main mark. A visual identity includes that logo along with the colours, typography and supporting elements used across the brand’s materials.', 'اللوجو هو العلامة الأساسية للبراند. الهوية البصرية بتشمل اللوجو ومعاه الألوان والخطوط والعناصر اللي بتستخدمها في المطبوعات وباقي تطبيقات البراند.'],
    packaging: ['Yes, Khaled designs packaging. The final artwork needs to match the actual pack dimensions and the printer’s requirements. You can ask him about the specific product and packaging you need.', 'أيوه، خالد بيصمم تغليف المنتجات. التصميم النهائي لازم يتجهز على مقاسات العبوة الفعلية ومتطلبات المطبعة. تقدر تسأله مباشرة عن نوع المنتج والتغليف اللي محتاجه.'],
    typography: ['Typography is part of Khaled’s design work. If you need custom lettering or a particular type treatment, he can confirm the scope and any font licensing requirements.', 'الخطوط جزء من شغل خالد. لو محتاج حروف مرسومة مخصوص أو معالجة معينة للاسم، اتأكد معاه من المطلوب وأي تراخيص للخطوط المستخدمة.'],
    arabic: ['You can ask in Arabic or English here. For a project in Arabic or both languages, Khaled can confirm the lettering, typography and deliverables you need.', 'تقدر تسأل هنا بالعربي أو بالإنجليزي. ولو مشروعك بالعربي أو باللغتين، خالد يقدر يوضح لك شغل الخطوط والحروف والملفات المناسبة ليه.'],
    guidelines: ['Brand guidelines explain how to use an identity: the logo, colours, fonts and examples of applications. What the guide covers is agreed as part of the project.', 'دليل الهوية بيوضح استخدام اللوجو والألوان والخطوط، ومعاهم أمثلة لتطبيق الهوية. محتوى الدليل وتفاصيله بيتحددوا حسب المشروع.'],
    payment: ['Payment terms aren’t published on the site. Khaled can confirm the currency, payment method and any instalments in the project agreement.', 'شروط الدفع مش معلنة على الموقع. العملة وطريقة الدفع وأي دفعات بيتحددوا مباشرة مع خالد ضمن اتفاق المشروع.'],
    rights: ['Usage rights, editable files and third-party licences should be clear in the project agreement. The site doesn’t publish standard terms, so Khaled needs to confirm the terms for your project.', 'حقوق الاستخدام والملفات المفتوحة وتراخيص أي عناصر خارجية لازم تكون واضحة في اتفاق المشروع. مفيش شروط ثابتة منشورة هنا، فخالد هو اللي يأكد لك التفاصيل.'],
    contact: ['You can reach Khaled directly using the WhatsApp or email links below. This chat answers questions about his work; it doesn’t send messages or book projects on your behalf.', 'تقدر تتواصل مع خالد مباشرة من زر واتساب أو الإيميل الموجودين تحت. الشات هنا بيرد على أسئلتك عن الشغل، لكنه مش بيبعت رسائل لخالد أو بيحجز مشروع مكانك.'],
    availability: ['The portfolio says Khaled is available for work. The next start date still needs to be confirmed with him directly.', 'الموقع موضح إن خالد متاح للشغل، لكن أقرب ميعاد للبداية محتاج تأكيد منه مباشرة.'],
    about: ['Khaled Ramadan is a brand designer based in Cairo. His portfolio lists over six years of experience, with work in identity, packaging, typography and guidelines.', 'خالد رمضان مصمم هويات بصرية مقيم في القاهرة. الموقع موضح إن عنده خبرة أكتر من ٦ سنين، وشغله بيشمل الهوية والتغليف والخطوط وأدلة الهوية.'],
    location: ['Khaled is based in Cairo. You can contact him through the WhatsApp and email links on the site to discuss working together.', 'خالد مقيم في القاهرة. تقدر تتواصل معاه من واتساب أو الإيميل الموجودين على الموقع عشان تتفقوا على الشغل.'],
    discount: ['There’s no discount policy or package price listed here. Khaled can tell you what fits your budget and the work you actually need, without promising a discount in advance.', 'مفيش خصومات أو أسعار باقات معلنة هنا. خالد يقدر يوضح لك إيه المناسب لميزانيتك وللمطلوب فعلًا، لكن مقدرش أوعدك بخصم من خلال الشات.'],
    other: ['That service isn’t clearly listed in the portfolio. Please check with Khaled directly before assuming it’s available.', 'الخدمة دي مش مذكورة بوضوح ضمن شغل الموقع. الأفضل تتأكد من خالد مباشرة إنها متاحة قبل ما تتفقوا عليها.'],
    who: ['I’m the portfolio’s automated assistant, not Khaled himself. I can answer common questions and refer to the projects currently published on this site.', 'أنا المساعد الآلي للموقع، مش خالد نفسه. أقدر أرد على الأسئلة المعتادة وأرجع للمشاريع المنشورة حاليًا على الموقع.'],
    unknown: ['I’m not sure what you mean yet. Could you put the question another way? I can help with the work, pricing, timelines or getting in touch with Khaled.', 'مش متأكد إني فهمت قصدك. ممكن تقول السؤال بطريقة تانية؟ أقدر أساعدك في أسئلة عن الشغل أو الأسعار أو المدة أو التواصل مع خالد.'],
    correction: ['I may have misunderstood your question. Tell me which point you meant, and I’ll stick to that.', 'ممكن أكون فهمت سؤالك غلط. وضّح لي النقطة اللي تقصدها، وهرد عليها مباشرة.'],
    greet: ['Hi! What would you like to know about Khaled’s work?', 'أهلًا بيك! تحب تعرف إيه عن شغل خالد؟'],
    thanks: ['You’re welcome.', 'العفو، تحت أمرك.'],
    bye: ['Thanks for stopping by. You can reach Khaled through the contact links whenever you’re ready.', 'شكرًا لزيارتك. تقدر تتواصل مع خالد من الروابط الموجودة على الموقع في أي وقت.'],
    ack: ['Sure. Is there anything else you’d like to know?', 'تمام، تحب تعرف حاجة تانية؟']
  };
  const rules = [
    ['who', /who are you|are you (?:a bot|ai|human|khaled)|انت (?:مين|خالد|بوت|روبوت|انسان)|مين (?:انت|بيكلمني)/],
    ['correction', /wrong answer|not what i asked|not helpful|مش (?:ده|دي|فاهم|بتفهم)|اجابه غلط|ردك غلط/],
    ['price', /\b(?:price|pricing|cost|quote|rates?|fees?|how much)\b|سعر|اسعار|تكلف|بكام|كام فلوس|عرض سعر|كم السعر|سعرك/],
    ['time', /\b(?:timeline|turnaround|deadline|duration|how long|delivery date)\b|مده|موعد تسليم|امتي (?:يخلص|هتخلص|تخلص)|وقت (?:قد|اد)|كام يوم|كم يوم|كم يستغرق|مستعجل/],
    ['revisions', /\b(?:revisions?|changes?|amendments?)\b|تعديل|تعديلات|مش عاجبني التصميم/],
    ['deliverables', /\b(?:deliverables?|files?|editable|formats?|what do i (?:get|receive))\b|هستلم|استلم ايه|ملفات|ملف مفتوح|صيغ/],
    ['payment', /\b(?:payment|pay|deposit|instalments?|installments?|currency|paypal|transfer)\b|دفع|عربون|تحويل|اقساط|عمله/],
    ['rights', /\b(?:copyright|ownership|rights?|licen[cs]e|contract)\b|حقوق|ملكيه|تراخيص|ترخيص|عقد/],
    ['discount', /\b(?:discount|cheap|cheaper|budget|packages?)\b|خصم|ارخص|ميزانيه|باقات|باقه/],
    ['availability', /\b(?:available|availability|when can you start|taking projects)\b|متاح|فاضي|تقدر تبدا|امتي تبدا/],
    ['contact', /\b(?:contact|whatsapp|email|phone|hire|book|start a project|work together|talk to khaled|human)\b|واتس|ايميل|رقمك|تواصل|اكلم خالد|نبدا|ابدا مشروع|اشتغل معاك|اكلم حد/],
    ['process', /\b(?:process|how (?:does it|do you|do we) work|steps)\b|خطوات|طريقه الشغل|طريقه العمل|بيمشي ازاي|الشغل ازاي|ازاي بتشتغل/],
    ['location', /\b(?:where|based|location|cairo|egypt|remote|worldwide)\b|فين انت|انت فين|مقيم|منين|مكانك|القاهره|عن بعد/],
    ['about', /\b(?:about|experience|years|who is khaled)\b|مين خالد|عن خالد|عنك|خبره|خبرتك|سنين/],
    ['arabic', /\b(?:arabic|bilingual)\b|بالعربي|عربي|عربيه|باللغتين/],
    ['guidelines', /\b(?:guidelines?|brand ?book|brand manual|style guide)\b|دليل الهويه|جايدلاين|براند بوك/],
    ['packaging', /\b(?:packaging|labels?|bottles?|boxes|packs?)\b|تغليف|عبوه|عبوات|ليبل|باكدج|باكيج|علب/],
    ['typography', /\b(?:typography|fonts?|lettering|typeface)\b|خطوط|تايبوجرافي|حروف|كاليجرافي/],
    ['identity', /\b(?:identity|identities|branding|visual system)\b|هويه|هويات|براندنج/],
    ['logo', /\b(?:logos?|logotype|brandmark)\b|لوجو|شعار|شعارات|لوغو/],
    ['other', /\b(?:website|ui|ux|app|social media|seo|marketing|photography|3d|animation)\b|موقع|سوشيال|موشن|تصوير|تسويق|تطبيق/],
    ['svc', /\b(?:services|what do you (?:design|do)|what can you do)\b|خدمات|بتعمل ايه|بتصمم ايه|بتقدم ايه/]
  ];
  const labels = {svc:['What do you design?','بتصمم إيه؟'],work:['Show me the work','وريني الأعمال'],price:['How much does it cost?','التكلفة بتتحدد إزاي؟'],process:['How does it work?','الشغل بيمشي إزاي؟'],time:['How long does it take?','المشروع بياخد وقت قد إيه؟'],contact:['Contact Khaled','أتواصل مع خالد إزاي؟']};
  function create() {
    const state = {turn:0,L:'en',last:null,forced:null};
    const chips = ar => ['svc','work','price','process'].map(id => ({t:labels[id][ar?1:0],f:{id}}));
    function respond(raw, forced) {
      state.turn++;
      const text = String(raw || '').slice(0,500), q=normalize(text);
      if (/^(?:english|in english|بالانجليزي|انجليزي)$/.test(q)) state.forced='en';
      if (/^(?:arabic|بالعربي|عربي)$/.test(q)) state.forced='ar';
      const ar = /[\u0600-\u06ff]/.test(text) ? state.forced !== 'en' : state.forced === 'ar';
      state.L=ar?'ar':'en';
      const list=projects();
      const contact=document.querySelector('a[href^="https://wa.me/"]');
      const wa=contact?contact.href:'https://wa.me/201010166582';
      let ids=[], answer='', work=false, whatsapp=false, feedback=false;
      if(forced) ids=[forced.id==='rev'?'revisions':forced.id==='deliv'?'deliverables':forced.id];
      if(!ids.length && /\b(?:reviews?|testimonials?|feedback)\b|تقييم|راي العملاء|اراء العملاء|تجارب العملاء/.test(q)) ids=['reviews'];
      if(!ids.length && /\b(?:difference|vs|versus)\b|الفرق بين|فرق ايه/.test(q) && /logo|لوجو|شعار/.test(q) && /identity|هويه/.test(q)) ids=['difference'];
      if(!ids.length) ids=rules.filter(([,pattern])=>pattern.test(q)).map(([id])=>id);
      if(!ids.some(id=>!['logo','identity','packaging','typography','arabic','other'].includes(id)) && /\b(?:show|see|examples|portfolio|projects|case studies)\b|وريني|اشوف|امثله|نماذج|مشاريع|اعمالك/.test(q)) ids=['work'];
      // Answer the practical question before a generic service noun or language mention.
      if(ids.some(id=>!['logo','identity','packaging','typography','arabic','other'].includes(id))) ids=ids.filter(id=>!['logo','identity','packaging','typography','arabic','other'].includes(id));
      if(!ids.length && /\b(?:portfolio|projects?|work|case stud(?:y|ies)|examples?|clients?)\b|اعمال|مشاريع|شغلك|وريني|اشتغلت مع مين/.test(q)) ids=['work'];
      if(!ids.length && /\b(?:logo|identity|packaging)\b|لوجو|هويه|تغليف/.test(q)) ids=[/logo|لوجو/.test(q)?'logo':/packaging|تغليف/.test(q)?'packaging':'identity'];
      const tokens=q.split(/\s+/).filter(t=>t.length>=3&&!/^(?:the|you|your|what|about|show|please|with|have|ممكن|عايز|عاوز|عندك|شغل|مشروع|مشاريع|وريني|خالد|تصميم)$/.test(t));
      const matches=list.map(p=>({p,n:tokens.filter(t=>(' '+normalize([p.title,p.category,p.client,p.overview,...(p.services||[])].join(' '))+' ').includes(' '+t+' ')).length})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n).map(x=>x.p);
      if(!ids.length && matches.length) ids=['work'];
      if(!ids.length && /^(?:more|tell me more|details|وضح اكتر|تفاصيل اكتر|كمل|وبعدين)$/.test(q) && state.last) ids=[state.last];
      if(!ids.length && /^(?:hi|hello|hey|اهلا|اهلا بيك|مرحبا|هاي|صباح الخير|مساء الخير|السلام عليكم|سلام عليكم)$/.test(q)) ids=['greet'];
      if(!ids.length && /^(?:thanks|thank you|thx|شكرا|تسلم|متشكر)$/.test(q)) ids=['thanks'];
      if(!ids.length && /^(?:bye|goodbye|مع السلامه|باي)$/.test(q)) ids=['bye'];
      if(!ids.length && /^(?:ok|okay|yes|تمام|ماشي|ايوه|ايوا|حلو)$/.test(q)) ids=['ack'];
      if(!ids.length) ids=['unknown'];
      ids=[...new Set(ids)].slice(0,2);
      const parts=ids.map(id=>{
        if(id==='work') {
          work=!!list.length;
          if(!list.length) return ar?'مفيش مشاريع منشورة على الموقع حاليًا. تقدر تتواصل مع خالد مباشرة لو محتاج تشوف أمثلة مناسبة لشغلك.':'There are no projects published on the site right now. You can contact Khaled directly if you need relevant examples.';
          const shown=(matches.length?matches:list).slice(0,3).map(p=>p.title).join(ar?'، ':', ');
          return ar?'من المشاريع المنشورة حاليًا: '+shown+'. افتح قسم الأعمال واضغط على أي مشروع عشان تشوف صوره وتفاصيله.':'Currently published projects include '+shown+'. Open Work and select a project to see its images and details.';
        }
        if(id==='reviews') {feedback=true;return ar?'تقدر تقرأ تجارب العملاء وكلامهم عن الشغل مع خالد في قسم «آراء العملاء» على الموقع.':'You can read the clients’ own feedback in Client Voices on this site.';}
        if(['price','contact','availability','discount','payment','rights'].includes(id)) whatsapp=true;
        if(id==='availability'&&!/available to work/i.test(document.querySelector('.f-av')?.textContent||'')) return ar?'أقرب ميعاد متاح محتاج تأكيد من خالد مباشرة.':'Please check the next available start date with Khaled directly.';
        return (replies[id]||replies.unknown)[ar?1:0];
      });
      answer=parts.join('\n\n'); state.last=ids[0];
      return {html:escape(answer).replace(/\n/g,'<br>'),ar,L:state.L,ints:ids,acts:{work:work?{label:ar?'شوف الأعمال':'View work',href:'#work'}:null,fb:feedback?{label:ar?'آراء العملاء':'Client voices',href:'#feedback'}:null,wa:whatsapp?{label:ar?'تواصل مع خالد':'Contact Khaled',href:wa}:null},chips:chips(ar).filter(c=>!ids.includes(c.f.id)).slice(0,2)};
    }
    return {respond,state,initialChips:lang=>chips(lang==='ar'),recLang:()=>state.L==='ar'?'ar-EG':'en-US'};
  }
  window.PortfolioAssistant={create};
})();
