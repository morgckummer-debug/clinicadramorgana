-- Add unblock history tracking to pacientes table
ALTER TABLE pacientes
ADD COLUMN desbloqueado_em TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN desbloqueado_por TEXT DEFAULT NULL;

-- Update RLS policies if needed (read access)
-- Note: The existing RLS policies should already allow reading these new columns
