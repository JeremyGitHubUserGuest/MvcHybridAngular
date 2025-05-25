namespace MvcHybridAngular.Middlewares
{
    public class LanguageMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly string[] SupportedLanguages = { "fr", "en" };

        public LanguageMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.Value ?? "";
            var segments = path.Trim('/').Split('/');
            string? urlLang = null;

            // Détecte la langue dans l'URL (premier segment)
            if (segments.Length > 0 && SupportedLanguages.Contains(segments[0], StringComparer.OrdinalIgnoreCase))
            {
                urlLang = segments[0].ToLowerInvariant();
                // Met à jour le cookie si la langue de l'URL est différente du cookie actuel
                if (context.Request.Cookies["lang"] != urlLang)
                {
                    context.Response.Cookies.Append("lang", urlLang, new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) });
                }
            }
            else
            {
                // Si aucune langue dans l'URL et aucun cookie, on set la langue par défaut à "fr"
                if (!context.Request.Cookies.ContainsKey("lang"))
                {
                    context.Response.Cookies.Append("lang", "fr", new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) });
                }
                // Sinon, on ne touche pas au cookie existant
            }

            await _next(context);
        }
    }
}
