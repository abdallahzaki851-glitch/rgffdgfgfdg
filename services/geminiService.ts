
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAdvice = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنت الآن الخبير التقني لمنصة "AuraSync". 
      هذه المنصة تقوم بترجمة الفيديوهات مع مطابقة حركة الشفاه (Lip Sync) واستنساخ الصوت (Voice Cloning).
      المستخدم يسأل: "${userQuery}". 
      أجب باللغة العربية بأسلوب مهني وتقني، ووضح كيف تساعد تقنياتنا مثل GANs و TTS و LLMs في حل مشكلته. 
      اجعل الإجابة موجزة ومركزة على القيمة المضافة لـ AuraSync.`,
    });
    return response.text || "لم أتمكن من استلام رد واضح، يرجى المحاولة مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة تقنية. تأكد من إعدادات الاتصال وحاول مجدداً.";
  }
};

export const analyzeVideoChallenge = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك محلل تقني في AuraSync، قم بتحليل تحديات ترجمة ومطابقة شفاه لفيديو بهذا الوصف: "${description}".
      أعطِ تقديراً لمستوى الصعوبة (سهل/متوسط/صعب) وأهم التقنيات المقترحة (مثلاً: Wav2Lip, Whisper, etc).
      الرد يجب أن يكون بصيغة JSON: {"difficulty": "", "tech": [], "summary": ""}. باللغة العربية.`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Analysis Error:", error);
    return null;
  }
};
