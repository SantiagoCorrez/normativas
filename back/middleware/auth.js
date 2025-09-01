const jwt = require('jsonwebtoken');

// Middleware para verificar el token (sin cambios)
exports.verifyToken = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // req.user ahora contiene { userId, userRole }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no es válido.' });
  }
};

// Middleware para verificar el rol del usuario
exports.checkRole = (roles) => (req, res, next) => {
  // Asegúrate de que req.user exista y tenga un rol
  if (!req.user || !req.user.userRole) {
    return res.status(403).json({ msg: 'Acceso prohibido, rol no definido.' });
  }
  
  // Verifica si el rol del usuario está en la lista de roles permitidos
  if (roles.includes(req.user.userRole)) {
    next();
  } else {
    res.status(403).json({ msg: 'Acceso denegado, no tiene los permisos necesarios.' });
  }
};