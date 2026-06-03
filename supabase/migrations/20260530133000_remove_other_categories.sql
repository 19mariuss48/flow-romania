-- Remove all other categories except 'flow-romania' and 'comunitate'
DELETE FROM public.forum_categories 
WHERE slug NOT IN ('flow-romania', 'comunitate');
